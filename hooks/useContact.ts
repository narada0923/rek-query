import { useContactsQuery, useAddContactMutation, useDeleteContactMutation, useUpdateContactMutation } from "../redux/service/contactsApi";

const useContact = () => {
    const contactState = useContactsQuery();
    const [addContact] = useAddContactMutation();
    const [deleteContact] = useDeleteContactMutation();
    const [updateContact] = useUpdateContactMutation();
    return { contactState, addContact, deleteContact, updateContact };
};

export default useContact;
