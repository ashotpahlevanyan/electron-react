import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

const LoadingSpinner = (props) => {
	return (
		<div className="spinnerWrapper">
			<Spinner {...props} />
		</div>
	);
};

export default LoadingSpinner;