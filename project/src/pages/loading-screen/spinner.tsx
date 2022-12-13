import './spinner-style.css';

type SpinnerProps = {
  spinnerSize: number[];
}

function Spinner({spinnerSize}: SpinnerProps): JSX.Element {
  const [height, width] = spinnerSize;
  return (
    <div className='spinnet-main'style={{height: `${height}px`, width: `${width}px`}}>
      <div></div>
    </div>
  );
}

export default Spinner;
