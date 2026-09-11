import React, { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Indent,
  Outdent,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Palette,
  Type,
  Undo2,
  Redo2,
  RemoveFormatting,
  Code,
  Check,
  X,
  Sparkles
} from 'lucide-react';

interface GmailRichEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const FONT_FAMILIES = [
  { name: 'Sans Serif', value: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
  { name: 'Serif', value: 'Georgia, Cambria, "Times New Roman", Times, serif' },
  { name: 'Garamond', value: 'Garamond, "Hoefler Text", "Times New Roman", serif' },
  { name: 'Wide (Arial Black)', value: '"Arial Black", Gadget, sans-serif' },
  { name: 'Narrow (Arial Narrow)', value: '"Arial Narrow", sans-serif' },
  { name: 'Comic Sans', value: '"Comic Sans MS", "Comic Sans", cursive' },
  { name: 'Courier Monospace', value: '"Courier New", Courier, monospace' },
  { name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
  { name: 'Trebuchet MS', value: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", sans-serif' },
  { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
];

const FONT_SIZES = [
  { name: 'Small', commandValue: '1' }, // ~10px
  { name: 'Normal', commandValue: '3' }, // ~16px
  { name: 'Large', commandValue: '5' }, // ~24px
  { name: 'Huge', commandValue: '7' }, // ~36px
];

const TEXT_COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF',
  '#980000', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF',
  '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
  '#5B6A50', '#0F1A34', '#1E293B', '#15803D', '#B45309', '#BE185D', '#0284C7', '#4338CA', '#7E22CE', '#374151',
];

const BG_COLORS = [
  'transparent', '#F5F5F4', '#FEF3C7', '#DCFCE7', '#E0F2FE', '#F3E8FF', '#FFE4E6',
  '#000000', '#666666', '#FFCCCC', '#FFE599', '#B6D7A8', '#A4C2F4', '#D5A6BD',
  '#FCE5CD', '#D9EAD3', '#D0E0E3', '#CFE2F3', '#EAD1DC', '#FFF2CC', '#E1EAD8',
];

export const GmailRichEditor: React.FC<GmailRichEditorProps> = ({
  value,
  onChange,
  placeholder = 'Compose your case study story here... Use the Gmail formatting toolbar above for bold, lists, quotes, custom colors, images, and links.',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [rawHtml, setRawHtml] = useState(value);

  // Link Modal State
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('https://');

  // Image Modal State
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  // Selected Font & Size labels
  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES[0].name);
  const [selectedSize, setSelectedSize] = useState('Normal');

  // Sync internal content on mount or external reset
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      if (!isHtmlMode) {
        editorRef.current.innerHTML = value || '';
      }
    }
    setRawHtml(value || '');
  }, [value, isHtmlMode]);

  const exec = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      setRawHtml(html);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      setRawHtml(html);
    }
  };

  const handleRawHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setRawHtml(val);
    onChange(val);
  };

  const handleOpenLinkModal = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setLinkText(selection.toString());
    } else {
      setLinkText('');
    }
    setLinkUrl('https://');
    setShowLinkModal(true);
  };

  const handleInsertLink = () => {
    if (!linkUrl || linkUrl === 'https://') return;
    if (editorRef.current) {
      editorRef.current.focus();
      if (linkText) {
        const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color: #5B6A50; text-decoration: underline; font-weight: 600;">${linkText}</a>`;
        document.execCommand('insertHTML', false, linkHtml);
      } else {
        exec('createLink', linkUrl);
      }
      handleInput();
    }
    setShowLinkModal(false);
  };

  const handleInsertImage = () => {
    if (!imageUrl) return;
    if (editorRef.current) {
      editorRef.current.focus();
      const imgHtml = `
        <div style="margin: 20px 0; text-align: center;">
          <img src="${imageUrl}" alt="${imageAlt || 'Case Study Visual'}" style="max-width: 100%; height: auto; border-radius: 12px; border: 1px solid #E7E5E4; box-shadow: 0 4px 12px rgba(0,0,0,0.06); display: inline-block;" />
          ${imageAlt ? `<p style="font-size: 13px; color: #78716C; margin-top: 6px; font-style: italic;">${imageAlt}</p>` : ''}
        </div>
      `;
      document.execCommand('insertHTML', false, imgHtml);
      handleInput();
    }
    setImageUrl('');
    setImageAlt('');
    setShowImageModal(false);
  };

  const insertHorizontalRule = () => {
    exec('insertHorizontalRule');
  };

  const insertQuoteCallout = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      const quoteHtml = `
        <div style="background-color: #F5F5F4; border-left: 4px solid #5B6A50; padding: 16px 20px; margin: 20px 0; border-radius: 4px;">
          <p style="font-size: 15px; font-style: italic; color: #1C1917; margin: 0;">"Insert client quote or key growth takeaway here..."</p>
          <p style="font-size: 12px; font-weight: 700; color: #5B6A50; margin-top: 6px; margin-bottom: 0;">— Client Name, Role</p>
        </div>
      `;
      document.execCommand('insertHTML', false, quoteHtml);
      handleInput();
    }
  };

  return (
    <div className="border border-stone-300 rounded-2xl overflow-hidden bg-white shadow-xs focus-within:border-[#5B6A50] focus-within:ring-1 focus-within:ring-[#5B6A50] transition-all">
      {/* Gmail-Style Top Action Bar */}
      <div className="bg-[#F8F9FA] border-b border-stone-200 px-3 py-2 flex items-center justify-between flex-wrap gap-2 text-stone-700 select-none">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Undo / Redo */}
          <button
            type="button"
            onClick={() => exec('undo')}
            title="Undo (Ctrl+Z)"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 hover:text-black transition-colors"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('redo')}
            title="Redo (Ctrl+Y)"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 hover:text-black transition-colors"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-stone-300 mx-1" />

          {/* Font Family Selector */}
          <select
            value={selectedFont}
            onChange={(e) => {
              setSelectedFont(e.target.value);
              const found = FONT_FAMILIES.find((f) => f.name === e.target.value);
              if (found) exec('fontName', found.value);
            }}
            className="text-xs bg-white border border-stone-300 rounded px-2 py-1 focus:outline-none focus:border-[#5B6A50] font-medium"
            title="Font"
          >
            {FONT_FAMILIES.map((font) => (
              <option key={font.name} value={font.name}>
                {font.name}
              </option>
            ))}
          </select>

          {/* Font Size Selector */}
          <select
            value={selectedSize}
            onChange={(e) => {
              setSelectedSize(e.target.value);
              const found = FONT_SIZES.find((s) => s.name === e.target.value);
              if (found) exec('fontSize', found.commandValue);
            }}
            className="text-xs bg-white border border-stone-300 rounded px-2 py-1 focus:outline-none focus:border-[#5B6A50] font-medium"
            title="Size"
          >
            {FONT_SIZES.map((size) => (
              <option key={size.name} value={size.name}>
                {size.name}
              </option>
            ))}
          </select>

          <div className="h-4 w-px bg-stone-300 mx-1" />

          {/* Bold, Italic, Underline, Strikethrough */}
          <button
            type="button"
            onClick={() => exec('bold')}
            title="Bold (Ctrl+B)"
            className="p-1.5 hover:bg-stone-200 rounded font-bold text-stone-800 transition-colors"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('italic')}
            title="Italic (Ctrl+I)"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-800 transition-colors"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('underline')}
            title="Underline (Ctrl+U)"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-800 transition-colors"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('strikeThrough')}
            title="Strikethrough"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-800 transition-colors"
          >
            <Strikethrough className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-stone-300 mx-1" />

          {/* Color Popover Toggle (Gmail A with underline bar) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Text & Background Color"
              className={`p-1.5 hover:bg-stone-200 rounded flex items-center gap-0.5 transition-colors ${showColorPicker ? 'bg-stone-200' : ''}`}
            >
              <span className="font-serif font-black text-sm text-[#0F1A34] underline decoration-[#5B6A50] decoration-2">
                A
              </span>
            </button>

            {/* Gmail-Style Dual Color Picker */}
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-stone-200 shadow-xl rounded-xl p-3 z-50 w-64 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-700">Text & Highlight Colors</span>
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(false)}
                    className="text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Text Color Grid */}
                <div className="mb-3">
                  <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">Text Color</span>
                  <div className="grid grid-cols-10 gap-1">
                    {TEXT_COLORS.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          exec('foreColor', c);
                          setShowColorPicker(false);
                        }}
                        style={{ backgroundColor: c }}
                        className="w-5 h-5 rounded border border-stone-200 hover:scale-125 transition-transform"
                        title={c}
                      />
                    ))}
                  </div>
                </div>

                {/* Background Color Grid */}
                <div>
                  <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">Background Highlight</span>
                  <div className="grid grid-cols-7 gap-1">
                    {BG_COLORS.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          exec('hiliteColor', c);
                          setShowColorPicker(false);
                        }}
                        style={{ backgroundColor: c === 'transparent' ? '#FFFFFF' : c }}
                        className="w-5 h-5 rounded border border-stone-200 hover:scale-125 transition-transform flex items-center justify-center text-[9px]"
                        title={c}
                      >
                        {c === 'transparent' && '⊘'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-stone-300 mx-1" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => exec('justifyLeft')}
            title="Align Left"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 transition-colors"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('justifyCenter')}
            title="Align Center"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 transition-colors"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('justifyRight')}
            title="Align Right"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 transition-colors"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('justifyFull')}
            title="Justify"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 transition-colors"
          >
            <AlignJustify className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-stone-300 mx-1" />

          {/* Lists & Indents */}
          <button
            type="button"
            onClick={() => exec('insertOrderedList')}
            title="Numbered List"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 transition-colors"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('insertUnorderedList')}
            title="Bulleted List"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 transition-colors"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('outdent')}
            title="Indent Less"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 transition-colors"
          >
            <Outdent className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('indent')}
            title="Indent More"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 transition-colors"
          >
            <Indent className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-stone-300 mx-1" />

          {/* Quote & Divider */}
          <button
            type="button"
            onClick={insertQuoteCallout}
            title="Insert Quote Callout Block"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 transition-colors"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={insertHorizontalRule}
            title="Horizontal Divider"
            className="p-1.5 hover:bg-stone-200 rounded text-xs font-bold text-stone-700 transition-colors"
          >
            ―
          </button>

          <div className="h-4 w-px bg-stone-300 mx-1" />

          {/* Link & Image */}
          <button
            type="button"
            onClick={handleOpenLinkModal}
            title="Insert Link (Ctrl+K)"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 hover:text-[#5B6A50] transition-colors"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            title="Insert Image"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-700 hover:text-[#5B6A50] transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Remove formatting (Tx) */}
          <button
            type="button"
            onClick={() => exec('removeFormat')}
            title="Clear Formatting"
            className="p-1.5 hover:bg-stone-200 rounded text-stone-600 hover:text-stone-900 transition-colors"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>
        </div>

        {/* Right side: HTML Mode toggle */}
        <button
          type="button"
          onClick={() => setIsHtmlMode(!isHtmlMode)}
          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded font-semibold transition-colors ${
            isHtmlMode ? 'bg-[#5B6A50] text-white' : 'bg-white border border-stone-300 text-stone-600 hover:text-black'
          }`}
          title="Toggle HTML Code Editor"
        >
          <Code className="w-3.5 h-3.5" />
          <span>{isHtmlMode ? 'Visual Editor' : 'HTML Source'}</span>
        </button>
      </div>

      {/* Editor Content Surface */}
      <div className="relative min-h-[320px] max-h-[600px] overflow-y-auto p-4 sm:p-6 bg-white">
        {isHtmlMode ? (
          <textarea
            value={rawHtml}
            onChange={handleRawHtmlChange}
            className="w-full h-[320px] font-mono text-xs text-stone-800 bg-stone-50 p-4 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#5B6A50] leading-relaxed"
            placeholder="Edit raw HTML code..."
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            className="prose prose-stone max-w-none focus:outline-none text-[15px] sm:text-[16px] leading-relaxed min-h-[280px]"
            data-placeholder={placeholder}
            style={{ minHeight: '280px' }}
          />
        )}
      </div>

      {/* Gmail Compose Footer Info */}
      <div className="bg-[#F8F9FA] border-t border-stone-200 px-4 py-2 flex items-center justify-between text-xs text-stone-500">
        <span className="flex items-center gap-1.5 font-medium text-stone-600">
          <Sparkles className="w-3.5 h-3.5 text-[#5B6A50]" />
          Gmail Rich Editor Active • Styled for Case Studies
        </span>
        <span>{rawHtml.length} characters</span>
      </div>

      {/* Insert Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0F1A34] text-base flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#5B6A50]" />
                <span>Insert Hyperlink</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Display Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Visit Clive Official Website"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#5B6A50]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Destination URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#5B6A50]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInsertLink}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#5B6A50] hover:bg-[#4d5c43] text-white transition-colors"
                >
                  Insert Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insert Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0F1A34] text-base flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#5B6A50]" />
                <span>Insert Image in Case Study</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              {/* Image Source Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  1. Upload from Computer or Device (Instant Embedded Image)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const result = event.target?.result as string;
                        if (result) {
                          setImageUrl(result);
                          if (!imageAlt) setImageAlt(file.name.replace(/\.[^/.]+$/, ''));
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="block w-full text-xs text-stone-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#5B6A50]/10 file:text-[#5B6A50] hover:file:bg-[#5B6A50]/20 cursor-pointer border border-stone-200 rounded-xl p-2 bg-stone-50/50"
                />
              </div>

              <div className="flex items-center gap-2 text-stone-400 text-xs my-1">
                <div className="flex-1 h-px bg-stone-200" />
                <span>OR</span>
                <div className="flex-1 h-px bg-stone-200" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  2. Or Paste Public Image URL (Unsplash, Cloudinary, Imgur, etc.)
                </label>
                <input
                  type="url"
                  value={imageUrl.startsWith('data:') ? '' : imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#5B6A50]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Caption / Alt Text (Optional)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. Meta Ads Performance Dashboard 4.8X ROAS"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#5B6A50]"
                />
              </div>

              {imageUrl && (
                <div className="p-2 border border-stone-200 rounded-xl bg-stone-50 text-center">
                  <span className="text-[11px] font-semibold text-stone-500 block mb-1">Preview</span>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-36 mx-auto rounded object-contain border border-stone-200"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInsertImage}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#5B6A50] hover:bg-[#4d5c43] text-white transition-colors"
                >
                  Embed Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
