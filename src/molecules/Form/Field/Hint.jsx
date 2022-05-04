import React from 'react';
import { FormGroup } from '../';
import { AppIcon } from '../../../atoms';

export const FormFieldHint = (props) => {
	const { value, edited, className = '' } = props;
	return (
		<FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...props}>
			<div className='flex'>
				<span>
					<AppIcon className='far fa-lightbulb' />
					{value}
				</span>
			</div>
		</FormGroup>
	);
};
