import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

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

function EmojiButton({ onSelectEmoji }) {
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    onSelectEmoji(emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <StyledEmojiButton onClick={() => setShowPicker(!showPicker)}>
        😀
      </StyledEmojiButton>

      {showPicker && (
        <div style={{ position: "absolute", top: "32 px" }}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
}

export default EmojiButton;
