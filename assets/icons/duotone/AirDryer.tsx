import React, { SVGProps } from 'react';

const SvgAirDryer = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M4.585 12.782l4.83-1.295 1.923 7.179a2.5 2.5 0 01-4.83 1.294l-1.923-7.178zm7.798 1.63a1.25 1.25 0 011.53.883l.13.483a1.25 1.25 0 01-2.415.647l-.13-.482a1.25 1.25 0 01.885-1.531zM18 6l3-1v7l-3-1V6z'
					fill='currentColor'
					opacity={0.3}
				/>
				<path
					d='M8.445 4.778L17 6v5l-8.712 2.489A4.149 4.149 0 013 9.5a4.77 4.77 0 015.445-4.722zM7 11a2 2 0 100-4 2 2 0 000 4z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgAirDryer;
