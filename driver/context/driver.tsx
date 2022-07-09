import React, {ReactNode, useCallback, useEffect, useState} from "react";
import axiosInstance from "configs/axios";
import {useRouter} from "next/router";

type Driver = {
    fullname: string,
    address: string,
    _id: string,
    phno: string | number,
    carType: string
}

interface IDriverContext {
    driver: Driver,
    updateDriver: (driver: any) => void,
    logout: () => void
}

export const DriverContext = React.createContext<IDriverContext>({
    driver: {
        fullname: '',
        address: '',
        _id: '',
        phno: '',
        carType: ''
    },
    updateDriver: (driver: any) => {},
    logout: () => {}
});

export const DriverContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [driver, setDriver] = useState<Driver>({
        fullname: '',
        address: '',
        _id: '',
        phno: '',
        carType: ''
    })

    const router = useRouter();

    const getDriver = useCallback(async () => {
        let token = ''

        if(typeof localStorage !== 'undefined') {
            if ((localStorage as any).getItem("pride-driver")) {
                token = (JSON.parse((localStorage as any).getItem("pride-driver") as string)).token
                token = `Bearer ${token}`
            }
        }

        const { data } =  await axiosInstance({
            method: 'GET',
            url: `/user/driver`,
            headers: {
                authorization: token
            }
        });

        setDriver(data.driver)
    }, [router])


    useEffect(() => {
        getDriver()
    }, [getDriver])

    const updateDriver = (driver: any) => {
        setDriver(driver)
    }

    const logout = () => {
        if (typeof localStorage === 'undefined') return
        localStorage.removeItem('pride-driver')
        updateDriver({})
        router.push('/auth')
        return;
    }

    return (
        <DriverContext.Provider
            value={{
                driver,
                updateDriver,
                logout
            }}
        >
            {children}
        </DriverContext.Provider>
    );
};
