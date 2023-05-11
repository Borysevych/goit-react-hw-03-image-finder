import { Component } from 'react';
import {
  ImageGalleryListItem,
  ImageGalleryListItemImage,
} from './ImageGalleryItem.styled';
// import PropTypes from 'prop-types';
export class ImageGalleryItem extends Component {
  onClickImg = e => {
    return this.props.onClick(e.currentTarget.dataset.image);
  };

  render() {
    const { webURL, largeURL } = this.props.dataGalleryItem;

    return (
      <ImageGalleryListItem onClick={this.onClickImg} data-image={largeURL}>
        <ImageGalleryListItemImage src={webURL} alt="" />
      </ImageGalleryListItem>
    );
  }
}

// ImageGalleryItem.propTypes = {
//   onClick: PropTypes.string.isRequired,
// };