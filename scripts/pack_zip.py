import os
import zipfile
import time

output_zip_path = os.path.join('public', 'socialentities-website.zip')
os.makedirs('public', exist_ok=True)

if os.path.exists(output_zip_path):
    os.remove(output_zip_path)

exclude_dirs = {
    'node_modules',
    '.git',
    'dist',
    '.vite',
    '__pycache__',
    '.next'
}

exclude_files = {
    'socialentities-website.zip',
    '.DS_Store',
    'socialentities-website.tar.gz',
    'package-lock.json',
    'bun.lock'
}

# Standard DOS/Windows zip structure
count = 0
dir_count = 0

with zipfile.ZipFile(output_zip_path, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zipf:
    # First record all directories
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.git')]
        
        # Write directory entry with forward slash for Windows Explorer compatibility
        rel_root = os.path.relpath(root, '.').replace('\\', '/')
        if rel_root != '.':
            dir_path = rel_root.rstrip('/') + '/'
            zinfo = zipfile.ZipInfo(dir_path)
            zinfo.date_time = time.localtime(time.time())[:6]
            zinfo.external_attr = 0o755 << 16 | 0x10  # directory attribute
            zipf.writestr(zinfo, '')
            dir_count += 1
        
        for file in files:
            if file in exclude_files or file.endswith('.pyc'):
                continue
            file_path = os.path.join(root, file)
            if os.path.abspath(file_path) == os.path.abspath(output_zip_path):
                continue
            
            rel_file = os.path.relpath(file_path, '.').replace('\\', '/')
            
            with open(file_path, 'rb') as f:
                data = f.read()
            
            zinfo = zipfile.ZipInfo(rel_file)
            zinfo.date_time = time.localtime(os.path.getmtime(file_path))[:6]
            zinfo.compress_type = zipfile.ZIP_DEFLATED
            zinfo.external_attr = 0o644 << 16  # standard file attribute
            zipf.writestr(zinfo, data)
            count += 1

print(f"Windows & Mac compatible ZIP created: {count} files, {dir_count} directories into {output_zip_path} ({os.path.getsize(output_zip_path)} bytes)")
