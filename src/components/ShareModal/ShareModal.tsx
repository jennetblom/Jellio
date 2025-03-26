import React, { useEffect, useState } from 'react'
import "./ShareModal.css"
import { RxCross2 } from "react-icons/rx";
import { BoardType } from '../../types';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    board: BoardType;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, board }) => {

    const [copySuccessText, setCopySuccessText] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (copySuccessText !== "") {
            const timer = setTimeout(() => {
                setCopySuccessText("");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [copySuccessText]);

    const generateInviteLink = () => {
        return `${window.location.origin}/#/board/${board.id}/invite`;
    }
    const inviteLink = generateInviteLink();

    const copyInviteLinkToClipboard = () => {
        navigator.clipboard.writeText(inviteLink).then(() => {

            setCopySuccessText("Link copied to clipboard!");
            setSuccess(true);
        }).catch((error) => {
            console.log("Error copying text", error);
            setCopySuccessText("Link didn´t copy");
            setSuccess(false);
        });
    };
    
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='modal-header'>
                    <p>Share board</p>
                    <RxCross2 onClick={onClose} size={25} className='close' />
                </div>
                <p>Anyone with the link can join as an member</p>
                <input type='text' value={inviteLink} readOnly className='linkShow' />
                <p style={{ color: success ? "lime" : "red", fontSize: '14px' }}>{copySuccessText}</p>
                <button className='copyLink' onClick={copyInviteLinkToClipboard}>Copy link</button>
            </div>
        </div>
    )
}

export default ShareModal