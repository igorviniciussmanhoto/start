import React, { useEffect, useState } from "react";
import {
  Layers3,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  ArrowUpRight,
  Gem,
  Package,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import Modal from "./components/Modal";
import MaterialForm from "./components/MaterialForm";
import { storageKey, currency, types, readMaterials } from "./materials";

export default function App() {
  const [materials, setMaterials] = useState(readMaterials);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [editor, setEditor] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(materials));
    } catch {
      setNotice(
        "Não foi possível salvar neste navegador. Os dados serão mantidos nesta sessão.",
      );
    }
  }, [materials]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 5000);
    return () => clearTimeout(timer);
  }, [notice]);
  const normalized = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const visible = materials.filter(
    (m) =>
      (filter === "Todos" || m.type === filter) &&
      normalized(m.name + " " + m.type).includes(normalized(query)),
  );
  const save = (form) => {
    const exists = editor !== "new";
    setMaterials((current) =>
      exists
        ? current.map((m) => (m.id === editor.id ? { ...m, ...form } : m))
        : [
            ...current,
            {
              ...form,
              id: crypto.randomUUID(),
              color: ["travertino", "branco", "ocre", "verde"][
                types.indexOf(form.type)
              ],
            },
          ],
    );
    setEditor(null);
    setNotice(
      exists
        ? "Material atualizado com sucesso."
        : "Material cadastrado com sucesso.",
    );
  };
  return (
    <div className="app">
      <aside className="sidebar">
        <a className="brand" href="./" aria-label="Marmo Fácil, início">
          <div className="brand-mark">
            m<span>.</span>
          </div>
          <span className="brand-name">
            marmo<span>fácil</span>
          </span>
        </a>
        <div className="sidebar-label">WORKSPACE</div>
        <nav>
          <a className="nav-link active" href="#materiais" aria-current="page">
            <Layers3 size={19} />
            <span>Materiais</span>
            <span className="nav-dot" />
          </a>
        </nav>
        <div className="sidebar-bottom">
          <div className="workspace-avatar">MF</div>
          <div>
            <strong>Meu workspace</strong>
            <span>Gestão de marmoraria</span>
          </div>
          <span className="online-dot" />
        </div>
      </aside>
      <main id="materiais">
        <header className="topbar">
          <span>
            Workspace <span className="breadcrumb-divider">/</span>{" "}
            <strong>Materiais</strong>
          </span>
          <div className="topbar-right">
            <span className="status-dot" /> Ambiente local{" "}
            <div className="avatar">MF</div>
          </div>
        </header>
        <div className="content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">SEU CATÁLOGO, ORGANIZADO</div>
              <h1>
                Materiais<span>.</span>
              </h1>
              <p>Da matéria-prima ao próximo grande projeto.</p>
            </div>
            <button className="primary-button" onClick={() => setEditor("new")}>
              <Plus size={19} />
              Novo material
            </button>
          </div>
          <div className="stats">
            <article className="stat">
              <div>
                <span className="stat-label">Materiais cadastrados</span>
                <div className="stat-number">
                  {String(materials.length).padStart(2, "0")}
                  <span className="stat-note">no seu catálogo</span>
                </div>
              </div>
              <div className="stat-icon">
                <Package size={22} />
              </div>
            </article>
            <article className="stat">
              <div>
                <span className="stat-label">Tipos de material</span>
                <div className="stat-number">
                  {String(new Set(materials.map((m) => m.type)).size).padStart(
                    2,
                    "0",
                  )}
                  <span className="stat-note">possibilidades únicas</span>
                </div>
              </div>
              <div className="stat-icon">
                <Gem size={22} />
              </div>
            </article>
            <article className="inspiration">
              <div className="stone-decoration" />
              <div>
                <span>BELEZA EM CADA DETALHE</span>
                <p>
                  A base de projetos
                  <br />
                  <em>extraordinários.</em>
                </p>
              </div>
              <ArrowUpRight size={23} />
            </article>
          </div>
          <section className="catalog" aria-label="Catálogo de materiais">
            <div className="catalog-heading">
              <div>
                <h2>
                  Seu catálogo <span>{materials.length}</span>
                </h2>
                <p>Gerencie os materiais que dão forma às suas ideias.</p>
              </div>
              <label className="search">
                <Search size={18} />
                <input
                  aria-label="Buscar materiais"
                  placeholder="Buscar material…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    aria-label="Limpar busca"
                    onClick={() => setQuery("")}
                  >
                    <X size={15} />
                  </button>
                )}
              </label>
            </div>
            <div className="filter-bar">
              <div className="tabs" aria-label="Filtrar por tipo">
                {["Todos", ...types].map((type) => (
                  <button
                    key={type}
                    aria-pressed={filter === type}
                    className={filter === type ? "selected" : ""}
                    onClick={() => setFilter(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <span className="filter-caption">
                <SlidersHorizontal size={14} /> Por categoria
              </span>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Tipo</th>
                    <th>
                      Custo <span>/ m²</span>
                    </th>
                    <th>
                      Venda <span>/ m²</span>
                    </th>
                    <th className="actions-heading">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <div className="material-name">
                          <div className={"swatch " + m.color} />
                          <div>
                            <strong>{m.name}</strong>
                            <span>Acabamento natural</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={"type-badge type-" + types.indexOf(m.type)}
                        >
                          {m.type}
                        </span>
                      </td>
                      <td className="cost">{currency(m.cost)}</td>
                      <td className="price">{currency(m.price)}</td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="icon-button"
                            aria-label={"Editar " + m.name}
                            title="Editar material"
                            onClick={() => setEditor(m)}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="icon-button delete"
                            aria-label={"Apagar " + m.name}
                            title="Apagar material"
                            onClick={() => setDeleting(m)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!visible.length && (
              <div className="empty">
                <Search size={28} />
                <h3>Nenhum material encontrado</h3>
                <p>
                  {materials.length
                    ? "Tente outro nome ou categoria."
                    : "Cadastre seu primeiro material para começar."}
                </p>
                <button
                  className="secondary-button"
                  onClick={() =>
                    materials.length
                      ? (setQuery(""), setFilter("Todos"))
                      : setEditor("new")
                  }
                >
                  {materials.length ? "Limpar filtros" : "Novo material"}
                </button>
              </div>
            )}
            <footer className="table-footer">
              <span>
                Mostrando <strong>{visible.length}</strong> de{" "}
                <strong>{materials.length}</strong> materiais
              </span>
              <span>Valores em reais · por metro quadrado</span>
            </footer>
          </section>
          <footer className="page-footer">
            <span>
              marmo fácil <span>—</span> Feito para transformar.
            </span>
            <span>Seu próximo projeto começa aqui.</span>
          </footer>
        </div>
      </main>
      {editor && (
        <MaterialForm
          material={editor === "new" ? null : editor}
          onSave={save}
          onClose={() => setEditor(null)}
        />
      )}
      {deleting && (
        <Modal
          title="Apagar material?"
          subtitle={
            <>
              O material <strong>{deleting.name}</strong> será removido do
              catálogo. Esta ação não pode ser desfeita.
            </>
          }
          onClose={() => setDeleting(null)}
        >
          <div className="modal-actions">
            <button
              className="secondary-button"
              onClick={() => setDeleting(null)}
            >
              Cancelar
            </button>
            <button
              className="danger-button"
              onClick={() => {
                setMaterials((current) =>
                  current.filter((m) => m.id !== deleting.id),
                );
                setDeleting(null);
                setNotice("Material removido do catálogo.");
              }}
            >
              Apagar material
            </button>
          </div>
        </Modal>
      )}
      {notice && (
        <div className="toast" role="status">
          <Check size={18} />
          {notice}
          <button aria-label="Fechar aviso" onClick={() => setNotice("")}>
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
