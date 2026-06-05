import { ReactNode } from 'react';
import './Spin.css';
import { createPortal } from 'react-dom';

type SpinProps = {
  children?: ReactNode;
  spin?: boolean;
};
function Spin({ children, spin }: SpinProps) {
  if (!spin) return children;
  return (
    <>
      {createPortal(<div className='spin'>Loading...</div>, document.body)}
      {children}
    </>
  );
}

export default Spin;
