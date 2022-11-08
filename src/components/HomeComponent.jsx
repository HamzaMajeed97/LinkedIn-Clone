import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { CgSidebarRight } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { getActualProfileAction, getProfilesAction } from "../redux/actions";
import PostsComponent from "./PostsComponent";
import Sidebarleft from "./Sidebarleft";
import SidebarRight from "./SidebarRight";

const HomeComponent = () => {
    const IDprofilo = "6359078f7c44ce0015390c4c"; //mio id
    // aggiungete anche il vostro id cosi vedete il vostro profilo
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfilesAction()); // si caricano in store tutti i profili
        dispatch(getActualProfileAction(IDprofilo)); // in base all'id selezionato, si setta un profilo attuale
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Sidebarleft />
            <PostsComponent />
        </>
    );
};

export default HomeComponent;
