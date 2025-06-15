interface IDCardViewerProps {
  pdfUrl: string;
}

const IDCardViewer = ({ pdfUrl }: IDCardViewerProps) => (
  <div className="bg-white text-blue-950 p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">🪪 ID Card</h2>
    <a
      href={pdfUrl}
      download
      className="inline-block text-blue-600 hover:text-blue-800 underline font-medium transition duration-150"
    >
      ⬇️ Download ID Card
    </a>
    <div className="mt-4 border rounded overflow-hidden shadow-inner">
      <iframe
        src={pdfUrl}
        className="w-full h-[500px] md:h-[600px]"
        title="ID Card Preview"
      ></iframe>
    </div>
  </div>
);

export default IDCardViewer;
