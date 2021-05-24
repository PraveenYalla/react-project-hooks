import React, { useState, useEffect } from 'react';

import { Card, CardBody, CardTitle } from "reactstrap"

import SimpleBar from "simplebar-react"
import Employee from './Employee';

const EmployeeList = () => {

    const [UsersList, setUsersList] = useState([])

    useEffect(() => {

        const url = "https://jsonplaceholder.typicode.com/users"

        async function fetchUsers() {
            const users = await fetch(url)
                .then(res => res.json())
            setUsersList(users);
        }

        fetchUsers();

        return () => {
            // cleanup
        }
    }, [])


    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="mb-4">Employee Lists</CardTitle>
                    <SimpleBar style={{ maxHeight: "336px" }}>
                        {
                            (UsersList.length > 0) ?
                                UsersList.map((user) =>
                                    <Employee key={user.id} user={user} />
                                )
                                : "No Users"
                        }
                    </SimpleBar>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default EmployeeList;