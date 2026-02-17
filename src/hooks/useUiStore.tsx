import { useDispatch, useSelector } from 'react-redux';
// uiSlice
import { onCloseDateModal, onOpenDateModal, type RootState } from '../store';


export const useUiStore = () => {

    //console.log('uiStore');

    const dispatch = useDispatch();

    const { isDateModalOpen } = useSelector((state: RootState) => state.ui);
    //} = useSelector((state) => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }

    return {
        //* Propiedades
        isDateModalOpen,

        //* Métodos
        closeDateModal,
        openDateModal,
        toggleDateModal,
    }

}