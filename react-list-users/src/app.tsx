import React from "react";

export const App = () => {
  const [members, setMembers] = React.useState([]);
  const [organization, setOrganization] = React.useState("lemoncode"); // Estado para la organización
  const [inputValue, setInputValue] = React.useState("lemoncode"); // Estado para el valor del input

  // Fetch de miembros
  const fetchMembers = (org: string) => {
    fetch(`https://api.github.com/orgs/${org}/members`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Organization not found");
        }
        return response.json();
      })
      .then((result) => setMembers(result))
      .catch(() => setMembers([]));
  };

  // Llama a fetchMembers cuando cambia la organización
  React.useEffect(() => {
    fetchMembers(organization);
  }, [organization]);

  // Maneja el clic del botón de búsqueda
  const handleSearch = () => {
    setOrganization(inputValue);
  };

  return (
    <div className="user-list-container">
      <h1>Miembros de {organization}</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className="headerTable">
        <span className="header">Avatar</span>
        <span className="header">Login</span>
        <span className="header">Id</span>
       </div>
       <div className="members">
        {members.length > 0 ? (
          members.map((member) => (
            <div className="member">
            <React.Fragment key={member.id}>
              <img src={member.avatar_url} alt="avatar" />
              <div className="memberName">{member.login}</div>
              <div className="memberId">{member.id}</div>
            </React.Fragment>
            </div>
          ))
        ) : (
          <p>No members found</p>
        )}
      </div>
    </div>
  );
};
