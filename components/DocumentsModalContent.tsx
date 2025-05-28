
import React from 'react';
import { DocumentItem } from '../types';
import ActionButton from './ActionButton';
import { DocumentTextIcon, ArrowDownTrayIcon, EyeIcon, PaperAirplaneIcon } from './icons';

interface DocumentsModalContentProps {
  documents: DocumentItem[];
  T: any; // Translation object
}

const getFileIcon = (type: DocumentItem['type']): React.ReactNode => {
  return <DocumentTextIcon className="w-8 h-8 text-accent" />; 
};

const DocumentsModalContent: React.FC<DocumentsModalContentProps> = ({ documents, T }) => {
  const labels = T.documentsContent || {};
  const documentTypeNames = labels.documentTypes || {
    'PDF': "PDF Document",
    'DOCX': "Word Document",
    'TXT': "Text File",
    'Email': "Email Message",
    'Image': "Image File",
  };


  const handlePreview = (doc: DocumentItem) => {
    if (doc.url && doc.url !== '#') {
      window.open(doc.url, '_blank');
    } else {
      alert(labels.previewNotAvailable || "Preview not available for this document.");
    }
  };

  const handleDownload = (doc: DocumentItem) => {
     if (doc.url && doc.url !== '#') {
      const link = document.createElement('a');
      link.href = doc.url;
      link.setAttribute('download', doc.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(labels.downloadNotAvailable || "Download not available for this document.");
    }
  };

  const handleSend = (doc: DocumentItem) => {
    const messageTemplate = labels.simulatingSend || "Simulating send for: {docName}";
    const message = messageTemplate.replace('{docName}', doc.name);
    alert(message);
  };

  if (documents.length === 0) {
    return <p className="text-text-secondary">{labels.noDocumentsFound || "No documents found."}</p>;
  }

  return (
    <div className="flex-grow overflow-y-auto bg-card p-2 sm:p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border-color rounded-lg shadow-sm bg-background">
          <thead>
            <tr className="bg-card-header">
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"> </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Name</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Type</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Added</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Size</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color">
            {documents.map((doc, idx) => (
              <tr key={doc.id} className={`transition-colors duration-100 hover:bg-accent/10 ${idx % 2 === 0 ? 'bg-background' : 'bg-card'}`}>
                <td className="px-4 py-3 align-middle">
                  {getFileIcon(doc.type)}
                </td>
                <td className="px-4 py-3 align-middle max-w-[180px] sm:max-w-xs truncate">
                  <span className="font-medium text-text-primary" title={doc.name}>{doc.name}</span>
                </td>
                <td className="px-4 py-3 align-middle whitespace-nowrap">
                  <span className="text-xs font-semibold text-text-secondary">{documentTypeNames[doc.type] || doc.type}</span>
                </td>
                <td className="px-4 py-3 align-middle whitespace-nowrap">
                  <span className="text-xs text-text-secondary">{doc.dateAdded}</span>
                </td>
                <td className="px-4 py-3 align-middle whitespace-nowrap">
                  <span className="text-xs text-text-secondary">{doc.size}</span>
                </td>
                <td className="px-4 py-3 align-middle text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="rounded-full bg-accent/10 p-2 text-accent hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent"
                      onClick={() => handlePreview(doc)}
                      type="button"
                      title="Preview"
                      aria-label={`Preview ${doc.name}`}
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button
                      className={`flex items-center gap-1 rounded-full bg-green-100 p-2 pr-3 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition ${!doc.url || doc.url === '#' ? 'opacity-60 cursor-not-allowed' : ''}`}
                      onClick={() => { if (doc.url && doc.url !== '#') handleDownload(doc); }}
                      type="button"
                      title={doc.url && doc.url !== '#' ? 'Download' : 'Download not available'}
                      aria-label={`Download ${doc.name}`}
                      disabled={!doc.url || doc.url === '#'}
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      <span className="hidden sm:inline font-semibold text-xs">Download</span>
                      <span className="sm:hidden block text-[10px] font-semibold ml-1">Download</span>
                    </button>
                    <button
                      className="rounded-full bg-blue-100 p-2 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => handleSend(doc)}
                      type="button"
                      title="Send"
                      aria-label={`Send ${doc.name}`}
                    >
                      <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentsModalContent;