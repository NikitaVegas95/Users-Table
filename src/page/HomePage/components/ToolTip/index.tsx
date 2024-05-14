import { useState } from 'react';
import classes from './index.module.css';

interface IToolTipProps {
  imgLink: string;
}
const ToolTip = (props: IToolTipProps) => {
  const {imgLink} = props
  const [showToolTip, setShowToolTip] = useState(false)

  const onMouseEnterHandler = () =>{
    setShowToolTip(true)
  }

  const onMouseLeaveHandler  = () =>{
    setShowToolTip(false)
  }

  return (
    <div className={classes.container} onMouseMove={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      {showToolTip && <img className={classes.img} src={imgLink} alt="" />}
    </div>
  );
};

export default ToolTip;
