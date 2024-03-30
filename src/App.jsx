import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState('');

  const [formatBold, setFormatBold] = useState(false);
  const [formatItalic, setFormatItalic] = useState(false);
  const [formatHeading, setFormatHeading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFormat = (format) => {
    const textarea = document.getElementById('text');
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    // Check if there's any text selected
    if (selectionStart !== selectionEnd) {
      const selectedText = textarea.value.substring(selectionStart, selectionEnd);
      let newText;

      switch (format) {
        case 'bold':
          newText = toggleMarkdownSyntax(textarea.value, '**', selectionStart, selectionEnd, formatBold);
          setFormatBold(!formatBold);
          break;
        case 'italic':
          newText = toggleMarkdownSyntax(textarea.value, '_', selectionStart, selectionEnd, formatItalic);
          setFormatItalic(!formatItalic);
          break;
        case 'heading':
          newText = toggleHeading(textarea.value, selectionStart, selectionEnd);
          setFormatHeading(!formatHeading);
          break;
        case 'link':
          newText = wrapInTag(selectedText, 'a', 'href');
          break;
        default:
          break;
      }

      const updatedText = textarea.value.substring(0, selectionStart) + newText + textarea.value.substring(selectionEnd);
      setText(updatedText);
    }
  };

  const toggleMarkdownSyntax = (text, syntax, start, end, currentState) => {
    const wrappedText = syntax + text.substring(start, end) + syntax;
    return currentState ? text.substring(start + syntax.length, end - syntax.length) : wrappedText;
  };

  const toggleHeading = (text, start, end) => {
    return formatHeading
      ? text.substring(start, end)
      : '# ' + text.substring(start, end);
  };

  const wrapInTag = (selectedText, tag, attribute) => {
    return `<${tag} ${attribute}="${selectedText}" target="_blank">${selectedText}</${tag}>`;
  };

  const parseMarkdown = (markdown) => {
    return markdown
      .replace(/^# /gm, '')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>');
  };

  return (
    <div className="flex flex-col md:min-h-screen mt-12 px-4">
      <div className='max-w-5xl md:max-w-full'>
        <div className='font-extrabold text-2xl md:text-4xl text-blue-600 mb-6 md:mb-10 text-center'>Markdown using own custom string manipulation</div>
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center mb-4 md:gap-4 gap-1">
            <button className='w-full md:w-28 text-blue-300 mb-2 md:mb-0' onClick={() => handleFormat('bold')}>{formatBold ? 'Unbold' : 'Bold'}</button>
            <button className='w-full md:w-28 text-blue-300 mb-2 md:mb-0' onClick={() => handleFormat('italic')}>{formatItalic ? 'Unitalic' : 'Italic'}</button>
            <button className='w-full md:w-28 text-blue-300 mb-2 md:mb-0' onClick={() => handleFormat('heading')}>{formatHeading ? 'S' : 'H'}</button>
            <button className='w-full md:w-28 text-blue-300 mb-2 md:mb-0' onClick={() => handleFormat('link')}>Link</button>
          </div>
          <textarea
  id="text"
  value={text}
  onChange={handleTextChange}
  className="text-white w-full md:w-[400px] h-20 md:h-[120px] mb-4 md:mb-7 px-2"
/>

          <div>
            <strong className='font-bold text-lg md:text-2xl flex justify-center items-center mb-2'>Preview:</strong>
            <div style={{ fontSize: formatHeading ? '36px' : '16px' }} className='w-full md:w-[400px] md:break-all'>
              <div dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
