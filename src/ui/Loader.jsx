export default function Loader() {
  // return <div className="loader"></div>;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </div>
  );
}
