interface IDCardViewerProps {
  pdfUrl: string;
}

const IDCardViewer = ({ pdfUrl }: IDCardViewerProps) => (
  <div className="bg-white p-6 rounded shadow">
    <h2 className="text-xl font-bold mb-4">ID Card</h2>
    <a href={pdfUrl} download className="text-blue-500 underline">Download ID Card</a>
    <iframe src={pdfUrl} className="w-full h-96 mt-4" title="ID Card Preview"></iframe>
  </div>
);

export default IDCardViewer;