import React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";

import {
  openImageModal,
  closeImageModal,
  changeImageModalFile,
  createImage,
} from "../../actions/imageActions";

import {
  getIsImageModalOpen,
  getImageFormFile,
  getImageErrors,
} from "../../reducers/selectors";

const customStyles = {
  content : {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 9999,
  },
};

class ImageFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFileChange(e) {
    const {changeImageModalFile} = this.props;
    e.preventDefault();
    changeImageModalFile(e.target.files[0]);
  }

  handleSubmit(e) {
    const {createImage, file} = this.props;
    e.preventDefault();
    createImage(file);
  }

  render() {
    const {openImageModal, isOpen, closeImageModal} = this.props;
    return (
      <div>
        <button className="btn btn-primary"
          onClick={openImageModal}>
          Upload Image
        </button>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeImageModal}
          style={customStyles}
          contentLabel="Image Post"
        >
          <h2>Upload Image</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">

              <input type="file" className="form-control-file"
                onChange={this.handleFileChange}
              />

            </div>
            <button type="submit" className="btn btn-primary">Upload</button>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    isOpen: getIsImageModalOpen(state),
    file: getImageFormFile(state),
    errors: getImageErrors(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    changeImageModalFile: file => dispatch(changeImageModalFile(file)),
    createImage: file => dispatch(createImage(file)),
    openImageModal: () => dispatch(openImageModal()),
    closeImageModal: () => dispatch(closeImageModal()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ImageFormModal);
