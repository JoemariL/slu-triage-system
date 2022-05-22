import React from "react";

class ReportsPDF extends React.PureComponent {
  render() {
    const stylePDF = () => {
      return `@page {
                size: portrait;
                size: 7in 9.25in;
                margin: 27mm 16mm 27mm 16mm;
              }`;
    };

    return (
      <div style={{ margin: "0", padding: "0" }}>
        <style>{stylePDF()}</style>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <span>Saint Louis University Triage Application</span>

            <br />

            <span className="text-2xl font-bold">{this.props.CAMPUS}</span>
            <span className="text-gray-600">Campus name</span>
          </div>

          <div className="container mx-auto flex flex-col gap-5">
            {this.props.REPORTS_TABLE}
          </div>
        </div>
      </div>
    );
  }
}

export default ReportsPDF;
