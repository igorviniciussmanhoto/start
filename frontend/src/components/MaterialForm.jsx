import React, { useState } from "react";
import { Check } from "lucide-react";
import Modal from "./Modal";
import { types } from "../materials";

export default function MaterialForm({ material, onSave, onClose }) {
  const [form, setForm] = useState(
    material || { name: "", type: "", cost: "", price: "", description: "" },
  );
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <Modal
      title={material ? "Editar material" : "Novo material"}
      subtitle="Cada detalhe faz parte de um grande projeto."
      onClose={onClose}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            ...form,
            name: form.name.trim(),
            cost: Number(form.cost),
            price: Number(form.price),
          });
        }}
      >
        <label>
          Nome do material
          <input
            autoFocus
            name="name"
            placeholder="Ex.: Calacata Golden"
            required
            maxLength={80}
            pattern=".*\S.*"
            value={form.name}
            onChange={update}
          />
        </label>
        <label>
          Tipo de material
          <select name="type" required value={form.type} onChange={update}>
            <option value="" disabled>
              Selecione o tipo
            </option>
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <div className="form-columns">
          <label>
            Custo por m²
            <div className="money-input">
              <span>R$</span>
              <input
                aria-label="Custo por metro quadrado"
                name="cost"
                type="number"
                min="0"
                max="999999999"
                step="0.01"
                placeholder="0,00"
                required
                value={form.cost}
                onChange={update}
              />
            </div>
          </label>
          <label>
            Venda por m²
            <div className="money-input">
              <span>R$</span>
              <input
                aria-label="Venda por metro quadrado"
                name="price"
                type="number"
                min="0"
                max="999999999"
                step="0.01"
                placeholder="0,00"
                required
                value={form.price}
                onChange={update}
              />
            </div>
          </label>
        </div>
        <label>
          Descrição <span className="optional">Opcional</span>
          <textarea
            name="description"
            rows="3"
            maxLength={500}
            placeholder="Acabamento, origem ou outras características…"
            value={form.description}
            onChange={update}
          />
        </label>
        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="primary-button" type="submit">
            <Check size={17} />
            {material ? "Salvar alterações" : "Cadastrar material"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
