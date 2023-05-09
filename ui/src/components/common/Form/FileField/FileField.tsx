import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export interface FileFieldProps {
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	accept: string;
	message: string;
}

const FileField = (props: FileFieldProps) => {
	const { onChange, accept, message } = props;

	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<Flex className="w-full">
			<button
				className="border-2 border-gray-300 p-2 rounded-md border-dashed bg-transparent w-full h-full"
				onClick={handleButtonClick}
			>
				<Flex column>
					<FontAwesomeIcon icon={faUpload} />
					<span>{message}</span>
				</Flex>
			</button>
			<input
				type="file"
				accept={accept}
				ref={inputRef}
				onChange={onChange}
				className="sr-only"
			/>
		</Flex>
	);
};

export default FileField;
