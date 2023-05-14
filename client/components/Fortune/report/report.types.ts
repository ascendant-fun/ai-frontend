import {UserReport} from "../../../../types/ApiClient";
import {ExportImageResult} from "../../../../utils/exportAsImage";

export interface ReportProps {
  nickName: string;
  userReport: UserReport;
  renderMode: boolean;
  hidden?: boolean;
  downloadHandler?: () => void;
  exportImage?: () => Promise<ExportImageResult | undefined>;
}
