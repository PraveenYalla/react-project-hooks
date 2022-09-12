import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, CardTitle } from 'reactstrap'

import QRCode from "react-qr-code";

const QrCode = () => {

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="mb-4">My Details</CardTitle>
                    <QRCode size="350" value="http://praveen-yalla.github.io/" />
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default QrCode;