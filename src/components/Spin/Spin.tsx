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
      {createPortal(
        <div className='spin' role='status' aria-label='Loading'>
          <div className='spin__ring' />
        </div>,
        document.body,
      )}
      {children}
    </>
  );
}

export default Spin;
