import React, { FC, useState, ChangeEvent, useRef } from "react";
import axiosClient from "../API/axiosClient";
import './Country.css'
const Country: FC = () => {

    const [listSeach, setListSearch] = useState<any>([]);
    const typingTimeOutRef = useRef<NodeJS.Timeout | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onSeach = async (searchTerm: string) => {
        if (searchTerm === "") {
            setListSearch([]);
            setLoading(false);
            return
        }
        try {
            const data = await axiosClient.get(`/name/${searchTerm}`);

            if (data) {
                setListSearch(data);
                setLoading(false);
            }
        } catch (error: any) {
            console.log('E404', error);
            setLoading(false);
        }
    }



    const handleChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        setLoading(true);

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }
        typingTimeOutRef.current = setTimeout(() => {
            onSeach(event.target.value);

        }, 500);


    }
    return (
        <div >
            <input className="input-search"
                onChange={handleChange}
            >

            </input>
            {<div className={loading ? 'loading' : 'not-loading'}>loading...</div>}
            <div className="custom-list">
                <ul className="list-container">
                    {/* ?.slice(0,10) */}
                    {!loading && listSeach.map((value: { name: { common: string } }) => (<li key={value.name.common}>{value.name.common}</li>))}
                </ul>
            </div>
        </div>

    )

}

export default Country;