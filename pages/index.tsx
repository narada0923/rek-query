import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
// import { useGetTodosQuery, useAddPostMutation } from '../redux/api/apiSlice';
import useContact from "../hooks/useContact";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Contact } from "../redux/model/contact.model";
import * as yup from "yup";

const contactSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    contact: yup.string().required(),
});

const Home: NextPage = () => {
    const allTheRefs: any = {};
    const { contactState, addContact, deleteContact, updateContact } = useContact();
    const [id, setId] = useState<string | null>(null);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(contactSchema),
    });
    const { data: contacts, isLoading, error } = contactState;

    // const useForm

    // const [todo, setTodo] = useState<Array<any>>([]);
    // const { data, isSuccess, isError, isLoading, error } = useGetTodosQuery();
    // const [ addTodo ] = useAddPostMutation();
    // if(isLoading){
    //   console.log("loading", isLoading)
    // }
    // if(data){
    //   console.log("data", data)
    // }
    // if(isSuccess){
    //   console.log("isSuccess", isSuccess)
    // }
    // if(isError){
    //   console.log("isError", isError)
    // }
    // if(error){
    //   console.log("err", error)
    // }
    // const add = () => {
    //   const todo: {
    //     title: string,
    //     body: string,
    //     userId: number,
    //   } = {
    //     title: "hahahah",
    //     body: "hehehehe",
    //     userId: 3,
    //   }
    //   addTodo(todo);
    // }
    const updateHandler = (contact: Contact) => {
        setId(contact.id as string);
        reset({
            name: contact.name,
            email: contact.email,
            contact: contact.contact,
        });
    };

    const registerContact = async (contact: any) => {
      try {
        if (id) {
            const result = await updateContact({
                id,
                contact,
            });
            if((result as any).data.message === "success"){
              setId(null);
              toast.success("success");
            }
        } else {
            await addContact(contact as Contact);
        }
      } catch (err) {
        toast.error("something went wrong");
      }
    };

    const deleteHandler = async (id: string) => {
        try {
            const result = await deleteContact(id);
            if ((result as any).data.message === "success") {
                toast.success("Done!");
            }
        } catch (err) {}
    };

    useEffect(() => {
        if (error) {
            toast.error("Something went wrong!");
        }
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                name: "",
                email: "",
                contact: "",
            });
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div>
            <form
                onSubmit={handleSubmit(registerContact)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    maxWidth: "400px",
                }}
            >
                <input
                    style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: errors.name?.message ? "red" : "#ccc",
                    }}
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="name"
                />
                <input
                    style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: errors.email?.message ? "red" : "#ccc",
                    }}
                    type="text"
                    {...register("email", { required: true })}
                    placeholder="email"
                />
                <input
                    style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: errors.contact?.message ? "red" : "#ccc",
                    }}
                    type="text"
                    {...register("contact", { required: true })}
                    placeholder="contact"
                />
                <input type="submit" value={id ? "save" : "create"} />
            </form>
            {/* <button onClick={add}>getTodos</button> */}
            {isLoading ? (
                <p>loading</p>
            ) : !error ? (
                contacts ? (
                    contacts.map((contact, index) => (
                        <div
                            ref={ref => (allTheRefs[contact.id as any] = ref)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                            key={index}
                        >
                            <h1>{contact.name}</h1>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <button onClick={() => updateHandler(contact as Contact)} value={contact.id}>
                                    edit
                                </button>
                                <button onClick={() => deleteHandler(contact.id as string)}>delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>empty</p>
                )
            ) : (
                <p>error</p>
            )}
        </div>
    );
};

export default Home;
