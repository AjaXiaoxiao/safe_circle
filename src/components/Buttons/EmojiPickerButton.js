import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

function EmojiButton({ onSelectEmoji }) {
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiObject) => {
    onSelectEmoji(emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <EmojiButtonWrapper>
      <StyledEmojiButton onClick={() => setShowPicker(!showPicker)}>
        😀
      </StyledEmojiButton>

      {showPicker && (
        <EmojiPickerWrapper >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </EmojiPickerWrapper>
      )}
    </EmojiButtonWrapper>
  );
}

export default EmojiButton;


const StyledEmojiButton = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: x-large;
`;

const EmojiButtonWrapper= styled.div`
  position: relative;
`;
const EmojiPickerWrapper=styled.div`
  position: absolute;
  bottom: 32px;
`;
