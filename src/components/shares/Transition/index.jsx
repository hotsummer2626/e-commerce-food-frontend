import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    opacity: ${({ isShow }) => (isShow ? "1" : "0")};
    transition: 0.3s ease;
`;

const Transition = ({ children, onClose }) => {
    const [isShow, setIsShow] = useState(false);
    const transitionRef = useRef(null);

    useEffect(() => {
        setIsShow(true);
    }, []);

    useEffect(() => {
        const transition = transitionRef.current;
        const clickEvent = (e) => {
            if (
                e.target !== transition &&
                !transition.contains(e.target) &&
                isShow
            ) {
                setIsShow(false);
                setTimeout(() => {
                    onClose();
                }, 300);
            }
        };
        if (isShow) {
            document.addEventListener("click", clickEvent);
        }
        return () => {
            document.removeEventListener("click", clickEvent);
        };
    }, [isShow]);

    return (
        <Container isShow={isShow} ref={transitionRef}>
            {children}
        </Container>
    );
};

export default Transition;
