import {  Dialog, DialogTitle } from '@mui/material';
import React, { useState } from 'react';

export const Modal = ({ children, modal, setModal, title }) => {

	return (
		<div>
			<Dialog open={modal} onClose={() => setModal(false)}>
				<DialogTitle id="customized-dialog-title">
					{title}
				</DialogTitle>
                    {children}
			</Dialog>
		</div>
	);
};
