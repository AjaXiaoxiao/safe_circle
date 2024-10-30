import SendIcon from '../../assets/Send.png';
import './SendButton.css';

const SendButton = () => {
    return (
    <button className='send-button'> <img alt="send" src={SendIcon}/></button>
    );
};

export default SendButton;