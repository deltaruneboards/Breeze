import type { StatusAction, StatusActionContext } from "breezeTypesActions";

import ReportPanel from "../report/ReportPanel";

const ReportAction: StatusAction = {
	id: "report",
	label: "Report",
	icon: "reports",
	order: 25,
	testId: "reportStatus",
	isVisible: ({ permissions }: StatusActionContext): boolean =>
		permissions.Status.report,
	Panel: ({ status, closePanel }: StatusActionContext): React.JSX.Element => (
		<ReportPanel
			targetType="status"
			targetId={status.id}
			closePanel={closePanel}
		/>
	),
};

export default ReportAction;
