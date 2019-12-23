import React from 'react';
import axios from 'commons/axios';
import { toast } from 'react-toastify';

class EditInventory extends React.Component {
  state = {
    id: '',
    name: '',
    price: '',
    tags: '',
    image: '',
    status: 'available'
  };

  componentDidMount() {
    const { id, name, image, tags, price, status } = this.props.product;
    this.setState({ id, name, image, tags, price, status });
  }

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  submit = e => {
    e.preventDefault();
    const product = { ...this.state };
    axios.put(`products/${this.state.id}`, product).then(response => {
      this.props.close(response.data);
      toast.success('Edit Success');
    });
  };

  onDelete = () => {
    axios.delete(`products/${this.state.id}`).then(response => {
      this.props.close();
      this.props.deleteProduct(this.state.id);
      toast.success('Delete Success');
    });
  };

  render() {
    return (
      <div className="inventory">
        <p className="title has-text-centered">Inventory</p>

        <form onSubmit={this.submit}>
          <div className="field">
            <div className="control">
              <label className="label">Name</label>
              <textarea className="textarea" name="name" value={this.state.name} onChange={this.handleChange} />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Price</label>
              <input
                className="input"
                type="number"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Tags</label>
              <input className="input" type="text" name="tags" value={this.state.tags} onChange={this.handleChange} />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Image</label>
              <input className="input" type="text" name="image" value={this.state.image} onChange={this.handleChange} />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Status</label>
              <div className="select is-fullwidth">
                <select name="status" value={this.state.status} onChange={this.handleChange}>
                  <option>available</option>
                  <option>unavailable</option>
                </select>
              </div>
            </div>
          </div>

          <br />
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link">Update</button>
            </div>
            <div className="control">
              <button className="button is-danger" type="button" onClick={this.onDelete}>
                Delete
              </button>
            </div>
            <div className="control">
              <button className="button" type="button" onClick={() => this.props.close()}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditInventory;
