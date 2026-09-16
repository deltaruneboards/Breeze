import type { CommentAction, CommentActionContext } from "breezeTypesActions";

import ReportPanel from "../report/ReportPanel";

const ReportAction: CommentAction = {
	id: "report",
	label: "Report",
	icon: "reports",
	order: 25,
	testId: "reportComment",
	isVisible: ({ permissions }: CommentActionContext): boolean =>
		permissions.Comments.report,
	Panel: ({ comment, closePanel }: CommentActionContext): React.JSX.Element => (
		<ReportPanel
			targetType="comment"
			targetId={comment.id}
			closePanel={closePanel}
		/>
	),
};

export default ReportAction;
