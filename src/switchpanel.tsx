import { Terminal } from './terminal';
import { Editor } from './editor';
import { InfoModal } from './modals';
import { Verbosity } from 'lambster';
import { useState } from 'preact/hooks';

export function SwitchPanel(props: { rows: number }) {
	function ToggleButton(props: {
		classes: string;
		toggledOn: boolean;
		text: string;
		onClick: (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => void;
	}) {
		return (
			<button
				type="button"
				className={`btn ${props.classes} ${
					props.toggledOn ? 'btn-success' : 'btn-light border'
				}`}
				onClick={props.onClick}
			>
				{props.text}
			</button>
		);
	}

	function Tab(props: {
		selected: boolean;
		text: string;
		onClick: (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => void;
	}) {
		return (
			<button
				className={`rounded-top border border-bottom-0 pl-3 pr-3 py-2 ${
					props.selected ? 'selected' : ''
				}`}
				style={{ outline: 'none' }}
				onClick={props.onClick}
			>
				{props.text}
			</button>
		);
	}

	function VerbositySelector(props: { name: string }) {
		return (
			<div className="btn-group btn-group-toggle">
				{[
					{
						text: 'None',
						onClick: () => {
							setVerbosity(Verbosity.NONE);
						},
					},
					{
						text: 'Reductions',
						onClick: () => {
							setVerbosity(Verbosity.LOW);
						},
					},
					{
						text: 'Step-by-step',
						onClick: () => {
							setVerbosity(Verbosity.HIGH);
						},
					},
				].map((info, idx) => (
					<label
						key={idx}
						className={`btn border ${
							verbosity === idx ? 'btn-success' : 'btn-light'
						}`}
					>
						<input
							type="radio"
							name={props.name}
							id={info.text}
							onClick={info.onClick}
						/>
						{info.text}
					</label>
				))}
			</div>
		);
	}

	const [displayTerminal, setDisplayTerminal] = useState(true),
		[renameFreeVars, setRenameFreeVars] = useState(false),
		[verbosity, setVerbosity] = useState(Verbosity.NONE);

	function toggleRenameFreeVars() {
		setRenameFreeVars(prev => !prev);
	}

	function showTerminal() {
		setDisplayTerminal(true);
	}

	function showEditor() {
		setDisplayTerminal(false);
	}

	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-7 col-md-4 col-lg-3 px-0">
						<Tab
							onClick={showTerminal}
							selected={displayTerminal}
							text={'Terminal'}
						/>
						<Tab
							onClick={showEditor}
							selected={!displayTerminal}
							text={'Editor'}
						/>
					</div>
					<div className="col-lg-9 d-lg-flex d-none justify-content-end align-items-center h-100 w-100 px-0">
						<span className="mr-2">Verbosity</span>
						<VerbositySelector name="lg-options" />
						<ToggleButton
							text="Rename free variables"
							classes="ml-3"
							toggledOn={renameFreeVars}
							onClick={toggleRenameFreeVars}
						/>
						<button
							className="btn btn-outline-info ml-3"
							data-toggle="modal"
							data-target="#infoModal"
							data-tooltip="tooltip"
							data-placement="top"
							title="What is lambda calculus?"
						>
							<i className="far fa-question-circle" />
						</button>
					</div>
					<div className="col-5 col-md-8 d-flex d-lg-none justify-content-end align-content-center pr-0">
						<button
							type="button"
							className="btn btn-outline-info mr-1 mr-md-5"
							data-toggle="modal"
							data-target="#infoModal"
							data-tooltip="tooltip"
							data-placement="top"
							title="What is lambda calculus?"
						>
							<i className="far fa-question-circle" />
						</button>
						<button
							type="button"
							className="rounded-top border shaded border-bottom-0 pl-3 pr-3 py-2"
							data-toggle="modal"
							data-target="#settingsModal"
						>
							Settings
						</button>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
						<Terminal
							prompt="λ> "
							verbosity={verbosity}
							renameFreeVars={renameFreeVars}
							rows={props.rows}
							hidden={!displayTerminal}
						/>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
						<Editor
							verbosity={verbosity}
							renameFreeVars={renameFreeVars}
							rows={props.rows}
							hidden={displayTerminal}
						/>
					</div>
				</div>
			</div>
			<InfoModal />
			<div
				className="modal fade"
				id="settingsModal"
				tabIndex={-1}
				role="dialog"
				aria-labelledby="settingsModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="settingsModalLabel">
								Interpreter Settings
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="d-flex flex-column justify-content-center align-content-stretch">
								<p className="mb-1">Verbosity</p>
								<VerbositySelector name="modal-options" />
								<ToggleButton
									text="Rename free variables"
									classes="mt-3"
									toggledOn={renameFreeVars}
									onClick={toggleRenameFreeVars}
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-primary"
								data-dismiss="modal"
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
