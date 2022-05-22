import classnames from "classnames";
import { BiLoaderAlt } from "react-icons/bi";
import { FaHeadSideCough, FaTired, FaToiletPaper } from "react-icons/fa";
import { IoSadSharp } from "react-icons/io5";
import { MdSick, MdOutlinePregnantWoman } from "react-icons/md";
import { RiTempColdFill } from "react-icons/ri";

import { Modal, ModalHeader, ModalContent } from "../../common/Modal";
import { Icon, List, ListItem } from "../../common";

const HDF = ({
  EXPOSURE = false,
  POSITIVE = false,
  FEVER = false,
  COUGH = false,
  COLD = false,
  SORE_THROAT = false,
  DIFF_BREATHING = false,
  DIARRHEA = false,
  PREGNANT = false,
  HAS_HDF = false,
  loading = false,
  CLOSE = () => {},
}) => {
  if (loading) {
    return (
      <div className="w-full flex flex-col items-center">
        <BiLoaderAlt className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  } else {
    return (
      <>
        <div className="flex flex-col space-y-5">
          <ModalHeader close={CLOSE}>User Health Declaration Form</ModalHeader>

          <div className="p-5 grid grid-rows-3 grid-cols-2 gap-x-3 gap-y-5 rounded-2xl bg-gradient-to-b from-slate-100">
            <ListItem
              className="col-span-2 justify-center text-center"
              label="COVID-19 TRACK"
            />

            <ListItem
              className={classnames("justify-center text-center")}
              label={HAS_HDF ? (EXPOSURE === true ? "YES" : "NO") : "--"}
              subtitle="EXPOSURE"
            />

            <ListItem
              className={classnames("justify-center text-center")}
              label={HAS_HDF ? (POSITIVE === true ? "YES" : "NO") : "--"}
              subtitle="POSITIVE"
            />
          </div>

          {HAS_HDF && (
            <div className="flex flex-col space-y-3 select-none">
              <List position="vertical">
                <ListItem
                  className="justify-center text-center"
                  label="MEDICAL HISTORY"
                />
                {FEVER && (
                  <ListItem
                    icon={
                      <Icon
                        className="rounded-full bg-red-400 text-white"
                        icon={<MdSick className="h-4 w-4" />}
                      />
                    }
                    label="FEVER"
                    subtitle="Lagnat"
                  />
                )}
                {COUGH && (
                  <ListItem
                    icon={
                      <Icon
                        className="rounded-full bg-green-400 text-white"
                        icon={<FaHeadSideCough className="h-4 w-4" />}
                      />
                    }
                    label="COUGH"
                    subtitle="Pag-ubo"
                  />
                )}
                {COLD && (
                  <ListItem
                    icon={
                      <Icon
                        className="rounded-full bg-blue-400 text-white"
                        icon={<RiTempColdFill className="h-4 w-4" />}
                      />
                    }
                    label="COLD"
                    subtitle="Sipon"
                  />
                )}
                {SORE_THROAT && (
                  <ListItem
                    icon={
                      <Icon
                        className="rounded-full bg-yellow-400 text-white"
                        icon={<IoSadSharp className="h-4 w-4" />}
                      />
                    }
                    label="SORE THROAT"
                    subtitle="Pananakit ng lalamunan"
                  />
                )}

                {DIFF_BREATHING && (
                  <ListItem
                    icon={
                      <Icon
                        className="rounded-full bg-gray-400 text-white"
                        icon={<FaTired className="h-4 w-4" />}
                      />
                    }
                    label="DIFFICULTY IN BREATHING"
                    subtitle="Hirap sa paghinga"
                  />
                )}

                {DIARRHEA && (
                  <ListItem
                    icon={
                      <Icon
                        className="rounded-full bg-lime-400 text-white"
                        icon={<FaToiletPaper className="h-4 w-4" />}
                      />
                    }
                    label="DIARRHEA"
                    subtitle="Madalas na pagdumi"
                  />
                )}
              </List>

              <List position="vertical">
                <ListItem
                  className="bg-cyan-600 text-white"
                  icon={
                    <Icon
                      className="rounded-full bg-cyan-400 text-white"
                      icon={<MdOutlinePregnantWoman className="h-4 w-4" />}
                    />
                  }
                  label={
                    PREGNANT === null || PREGNANT === ""
                      ? "NOT APPLICABLE"
                      : PREGNANT === true
                      ? "PREGNANT"
                      : "NOT PREGNANT"
                  }
                  subtitle="Pregnancy status"
                  textColor="white"
                />
              </List>
            </div>
          )}
        </div>
      </>
    );
  }
};

export default HDF;
