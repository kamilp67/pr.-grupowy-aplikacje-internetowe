import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import items from "../data/items.json";
import { auth } from "../firebaseConfig";

type ItemType = {
  id: number;
  name: string;
  author: string;
  price: number;
  imgUrl: string;
  stockCount: number;
};

type UserType = {
  id: number;
  username: string;
  position: string;
};

export function Warehouse() {
  const [warehouseItems, setWarehouseItems] = useState<ItemType[]>([]); 
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ItemType | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    setWarehouseItems(items); 

    const unsubscribe = auth.onAuthStateChanged((user:any) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSaveItem = (item: ItemType) => {
    if (!user || !user.position || user.position !== 'employee') {
      return;
    }

    if (editingItem) {
      setWarehouseItems((prevItems) =>
        prevItems.map((i) => (i.id === item.id ? item : i))
      );
    } else {
      setWarehouseItems((prevItems) => [
        ...prevItems,
        {
          ...item,
          id: prevItems.length ? Math.max(...prevItems.map((i) => i.id)) + 1 : 1,
        },
      ]);
    }
    setShowModal(false);
    setEditingItem(null);
  };

  const handleEditItem = (item: ItemType) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDeleteItem = (id: number) => {
    if (!user || !user.position || user.position !== 'employee') {
      return;
    }

    setWarehouseItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  return (
    <>
      <h1>Warehouse Management</h1>
      {user && user.position === 'employee' && ( 
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Item
        </Button>
      )}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Price</th>
            <th>Stock Count</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {warehouseItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.author}</td>
              <td>{formatCurrency(item.price)}</td>
              <td>{item.stockCount}</td>
              <td>
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  style={{ width: "50px" }}
                />
              </td>
              <td>
                {user && user.position === 'employee' && ( 
                  <>
                    <Button
                      variant="warning"
                      onClick={() => handleEditItem(item)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ItemModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setEditingItem(null);
        }}
        handleSave={handleSaveItem}
        editingItem={editingItem}
      />
    </>
  );
}

type ItemModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSave: (item: ItemType) => void;
  editingItem: ItemType | null;
};

function ItemModal({
  show,
  handleClose,
  handleSave,
  editingItem,
}: ItemModalProps) {
  const [name, setName] = useState(editingItem?.name || "");
  const [author, setAuthor] = useState(editingItem?.author || "");
  const [price, setPrice] = useState(editingItem?.price || 0);
  const [imgUrl, setImgUrl] = useState(editingItem?.imgUrl || "");
  const [stockCount, setStockCount] = useState(editingItem?.stockCount || 0);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setAuthor(editingItem.author);
      setPrice(editingItem.price);
      setImgUrl(editingItem.imgUrl);
      setStockCount(editingItem.stockCount);
    } else {
      setName("");
      setAuthor("");
      setPrice(0);
      setImgUrl("");
      setStockCount(0);
    }
  }, [editingItem]);

  const handleSubmit = () => {
    const newItem = {
      id: editingItem?.id || 0,
      name,
      author,
      price,
      imgUrl,
      stockCount,
    };
    handleSave(newItem);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editingItem ? "Edit Item" : "Add New Item"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formItemName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formItemAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formItemPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formItemStockCount">
            <Form.Label>Stock Count</Form.Label>
            <Form.Control
              type="number"
              value={stockCount}
              onChange={(e) => setStockCount(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formItemImageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
