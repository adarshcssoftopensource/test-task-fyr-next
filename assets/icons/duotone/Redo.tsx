import React, { SVGProps } from 'react';

const SvgRedo = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M3.065 17.791c0-.82-.176-4.058 2.378-6.626C7.16 9.437 9.733 9.137 12.81 9V4.693a.75.75 0 011.254-.555l7.14 6.477a.75.75 0 01.006 1.106l-7.14 6.612a.75.75 0 01-1.26-.55V13.5c-1.953.054-3.344.178-4.608.58-1.82.58-3.227 2.222-4.22 4.928a.75.75 0 01-.704.492H3.06c0-.493.005-1.274.005-1.709z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgRedo;
