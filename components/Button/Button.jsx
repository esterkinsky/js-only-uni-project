import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';
import ArrowIcon from '../../modules/graph2d/arrow'

export const Button = ({ appearance, arrow = 'none', children, ...props } = ButtonProps) => {
	
	return (
		<button
			{...props}
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost',
				[styles.primary]: appearance == 'primary'
			})}
		>
			{children}
			{arrow != 'none' && <span className={cn(styles.arrow, {
				[styles.down]: arrow == 'down'
			})}>
				<ArrowIcon />
			</span>}
		</button>
	)
}