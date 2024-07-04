import { Button, Container, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import IconButton from "./components/IconButton";
import Fuse from "fuse.js";

const shops = ["Migros", "Teknosa", "Bim"];

const shopsObj = shops.map((shop, index) => ({
  id: index,
  name: shop,
}));

const categories = ["Elektronik", "Şarküteri", "Oyuncak", "Bakliyat", "Fırın"];

const categoriesObj = categories.map((category, index) => ({
  id: index,
  name: category,
}));

const TableRow = styled.tr`
  text-decoration: ${(props) =>
    props.isBought === true ? "line-through" : "unset"};
`;

function App() {
  const [products, setProducts] = useState([]);
  const [listInput, setListInput] = useState("");
  const [productShop, setProductShop] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const [filteredName, setFilteredName] = useState("");
  const [filteredShopId, setFilteredShopId] = useState("");
  const [filteredCategoryId, setFilteredCategoryId] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");

  const addProduct = () => {
    if (listInput && productShop && productCategory) {
      const product = {
        id: nanoid(),
        name: listInput,
        category: productCategory,
        shop: productShop,
      };

      setProducts([...products, product]);
      console.log(products);
    } else {
      alert("Alanlari doldurunuz");
    }

    setProductCategory("");
    setProductShop("");
    setListInput("");
  };

  const filteredProducts = products.filter((product) => {
    let result = true;

    const fuse = new Fuse(products, {
      keys: ["name"],
    });
    const res = fuse.search(filteredName);

    if (filteredName !== "" && !res.find((r) => r.item.id === product.id)) {
      result = false;
    }

    if (filteredShopId !== "" && product.shop !== filteredShopId) {
      result = false;
    }

    if (filteredCategoryId !== "" && product.category !== filteredCategoryId) {
      result = false;
    }

    if (
      filteredStatus !== "reset" &&
      ((product.isBought === true && filteredStatus !== true) ||
        (product.isBought === undefined && filteredStatus === true))
    ) {
      result = false;
    }

    return result;
  });

  return (
    <>
      <Container className="d-flex my-5">
        <Form className="w-100">
          <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
            <Form.Control
              placeholder="Name"
              value={listInput}
              onChange={(e) => {
                setListInput(e.target.value);
              }}
              type="text"
            />
          </Form.Group>
          <div className="d-flex gap-3">
            <Form.Select
              aria-label="Default select example"
              value={productShop}
              onChange={(e) => {
                setProductShop(e.target.value);
              }}
            >
              <option>Filter Shop</option>
              {shopsObj.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option>Filter Category</option>
              {categoriesObj.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
            <Button onClick={addProduct}>Ekle</Button>
          </div>
        </Form>
      </Container>

      <Container className="d-flex">
        <Form className="w-100">
          <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
            <Form.Control
              placeholder="Filter Name"
              value={filteredName}
              onChange={(e) => {
                setFilteredName(e.target.value);
              }}
              type="text"
            />
          </Form.Group>
          <div className="d-flex  gap-3">
            <Form.Select
              aria-label="Default select example"
              value={filteredShopId}
              onChange={(e) => {
                setFilteredShopId(e.target.value);
              }}
            >
              <option value={""}>Shop</option>
              {shopsObj.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              value={filteredCategoryId}
              onChange={(e) => setFilteredCategoryId(e.target.value)}
            >
              <option value={""}>Category</option>
              {categoriesObj.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
            <Form.Group
              onChange={(e) => {
                const val = e.target.value;
                setFilteredStatus(
                  val === "reset" ? val : val === "true" ? true : false
                );
              }}
              className="d-flex"
            >
              <Form.Check
                inline
                label="Tümü"
                name="group1"
                type={"radio"}
                id={"all"}
                value={"reset"}
              />
              <Form.Check
                inline
                label="Satın Alınanlar"
                name="group1"
                type={"radio"}
                id={"bought"}
                value={"true"}
              />
              <Form.Check
                inline
                label="Satın Alınmayanlar"
                name="group1"
                type={"radio"}
                id={"notBought"}
                value={"false"}
              />
            </Form.Group>
          </div>
        </Form>
      </Container>

      <Container className="mt-5">
        <Table>
          <thead className="text-center">
            <tr>
              <th>Name</th>
              <th>Shop</th>
              <th>Category</th>
              <th>ID</th>
              <th>Sil</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredProducts.map((product) => (
              <TableRow
                isBought={product.isBought}
                key={product.id}
                onClick={() => {
                  const updatedProducts = products.map((oldProduct) => {
                    if (oldProduct.id === product.id) {
                      return { ...oldProduct, isBought: true };
                    } else {
                      return oldProduct;
                    }
                  });
                  if (
                    updatedProducts.every((updatedProduct) =>
                      Boolean(updatedProduct.isBought)
                    )
                  ) {
                    alert("Alisveris Tamamlandi");
                  }
                  setProducts(updatedProducts);
                }}
              >
                <td>{product.name}</td>
                <td>
                  {
                    shopsObj.find(
                      (shopObj) => shopObj.id === parseInt(product.shop)
                    )?.name
                  }
                </td>
                <td>
                  {
                    categoriesObj.find(
                      (categoryObj) =>
                        categoryObj.id === parseInt(product.category)
                    )?.name
                  }
                </td>
                <td>{product.id}</td>
                <IconButton
                  handleClick={() => {
                    setProducts(
                      products.filter(
                        (filterProduct) => filterProduct.id !== product.id
                      )
                    );
                  }}
                />
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default App;
