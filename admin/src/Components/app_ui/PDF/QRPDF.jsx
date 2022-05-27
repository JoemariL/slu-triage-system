import React from "react";
import QRCode from "react-qr-code";

class QRPDF extends React.PureComponent {
  render() {
    const stylePDF = () => {
      return `@page {
                size: portrait;
                size: letter;
                margin: 27mm 16mm 27mm 16mm;
              }`;
    };

    return (
      <div style={{ margin: "0", padding: "0" }}>
        <style>{stylePDF()}</style>

        <div className="flex flex-col items-center space-y-10">
          {/* <div className="space-y-2 text-2xl text-center font-bold">
            <p> {this.props.CAMPUS}</p>
            <p> {this.props.GATE}</p>
          </div> */}

          <br />

          <QRCode size={576} value={this.props.QRCODE} />

          <br />

          {/* <footer className="footer ... text-center">
            <p className="text-gray-600">
              Saint Louis University Triage Application
            </p>
            <p className="block text-sm text-gray-600">
              Copyright © Saint Louis University. All Rights Reserved.
            </p>
          </footer> */}
        </div>
      </div>
    );
  }
}

export default QRPDF;
