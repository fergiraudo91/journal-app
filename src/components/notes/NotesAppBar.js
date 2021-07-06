import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNotes, startUploading } from "../../actions/notes";

export const NotesAppBar = ({ date }) => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);

  const dateTime = moment(date);

  const handleSave = () => {
    dispatch(startSaveNotes(note));
  };

  const handlePictureUpload = () => {
    document.getElementById('fileSelector').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if(file){
      dispatch(
        startUploading(file)
      );
    }


  };

  return (
    <div className="notes__appbar">
      <span>{`${dateTime.format("MMMM")} ${dateTime.format(
        "DD"
      )}, ${dateTime.format("YYYY")}`}</span>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        id="fileSelector"
        name="file"
      />
      <div>
        <button className="btn" onClick={handlePictureUpload}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
