import './spinner-style.css';

type SpinnerProps = {
  length: number;
}

export default function Spinner(length: SpinnerProps): JSX.Element {
  const divHeigth = (Number(length) + 1) * 158.4;
  return (
    <div className='spinnet-main'style={{height: `${divHeigth}px`}}>
    </div>
  );
}
