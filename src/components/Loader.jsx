const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <svg className="pl" width={240} height={240} viewBox="0 0 240 240">
        <circle
          className="pl__ring pl__ring--a"
          cx={120}
          cy={120}
          r={105}
          fill="none"
          stroke="#000"
          strokeWidth={20}
          strokeDasharray="0 660"
          strokeDashoffset={-330}
          strokeLinecap="round"
        />
        <circle
          className="pl__ring pl__ring--b"
          cx={120}
          cy={120}
          r={35}
          fill="none"
          stroke="#000"
          strokeWidth={20}
          strokeDasharray="0 220"
          strokeDashoffset={-110}
          strokeLinecap="round"
        />
        <circle
          className="pl__ring pl__ring--c"
          cx={85}
          cy={120}
          r={70}
          fill="none"
          stroke="#000"
          strokeWidth={20}
          strokeDasharray="0 440"
          strokeLinecap="round"
        />
        <circle
          className="pl__ring pl__ring--d"
          cx={155}
          cy={120}
          r={70}
          fill="none"
          stroke="#000"
          strokeWidth={20}
          strokeDasharray="0 440"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Loader;
