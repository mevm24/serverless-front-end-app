import { Addition } from './Addition';
import { Divition } from './Divition';
import { Multiply } from './Multiply';
import { RandomStringGenerator } from './RandomStringGenerator';
import { SquareRoot } from './SquareRoot';
import { Subtraction } from './Subtraction';

export const OperationToRender = ({ operationId }: { operationId: string }) => {
	const componentToRender = () => {
		switch (operationId) {
			case 'addition':
				return <Addition />;
			case 'subtraction':
				return <Subtraction />;
			case 'multiplication':
				return <Multiply />;
			case 'divition':
				return <Divition />;
			case 'squareRoot':
				return <SquareRoot />;
			case 'randomStringGeneration':
				return <RandomStringGenerator />;
			default:
				return <></>;
		}
	};
	return componentToRender();
};
