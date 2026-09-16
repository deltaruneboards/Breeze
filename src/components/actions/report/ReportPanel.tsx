import type React from "react";
import { useCallback, useState } from "react";

import smfTextVars from "../../../DataSource/Txt";
import { Modal } from "../../Modal";

interface ReportPanelProps {
	targetType: 'status' | 'comment';
	targetId: number;
	closePanel: () => void;
}

async function sendPM(subject: string, message: string): Promise<boolean> {
	const sessionResponse = await fetch('/index.php?action=pm;sa=send;g=1,2');
	const parser = new DOMParser();
	const sessionPage = parser.parseFromString(await sessionResponse.text(), 'text/html');
	const seqnumInput = sessionPage.querySelector('input[type="hidden"][name="seqnum"]') as HTMLInputElement | null;
	const toInput = sessionPage.getElementById('to_control') as HTMLInputElement | null;
	if (!seqnumInput || !toInput) {
		return false;
	}
	const cInput = seqnumInput.previousElementSibling as HTMLInputElement | null;
	if (!cInput) {
		return false;
	}
	const response = await fetch('/index.php?action=pm;sa=send2', {
		method: 'POST',
		body: new URLSearchParams({
			subject,
			message,
			to: toInput.value,
			[cInput.name]: cInput.value,
			seqnum: seqnumInput.value,
		}),
	});
	return response.redirected;
}

export default function ReportPanel({
	targetType,
	targetId,
	closePanel,
}: ReportPanelProps): React.JSX.Element {
	const [reason, setReason] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = useCallback(
		async (event: React.SubmitEvent<HTMLFormElement>) => {
			event.preventDefault();

			const link = new URL(window.location.href);
			link.hash = `#${targetType}-${targetId}`;
			const submitted = await sendPM(
				`Wall ${targetType} report`,
				`Report automatically submitted through the wall report form.

Link: ${link.toString()}

Reason: ${reason}`,
			);

			if (submitted) {
				closePanel();
			} else {
				setError("Failed to submit the report! Please try PMing the moderators directly.");
			}
		},
		[closePanel, reason, targetId, targetType],
	);

	const body = (
		<form id="report_form" onSubmit={handleSubmit}>
			<p>Please describe why this message should be reviewed.</p>
			<p className="error">{error}</p>
			<dl className="settings">
				<dt>
					<label htmlFor="report_comment">Reason</label>
				</dt>
				<dd>
					<textarea
						id="report_comment"
						rows={6}
						value={reason}
						onChange={(event) => setReason(event.target.value)}
					/>
				</dd>
			</dl>
			<div>
				<input
					type="submit"
					className="button"
					value={smfTextVars.general.send}
					disabled={reason.trim().length === 0}
				/>
				<input
					type="button"
					className="button"
					value={smfTextVars.general.cancel}
					onClick={closePanel}
				/>
			</div>
		</form>
	);

	return (
		<Modal
			show={true}
			content={{
				header: `Report ${targetType}`,
				body,
			}}
			onClose={closePanel}
		/>
	);
}
