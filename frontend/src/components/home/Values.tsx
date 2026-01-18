import { Box, Factory, Search } from "lucide-react";

const Values = () => (
  <section className="values">
    <div className="value-item">
      <Box size={40} strokeWidth={1} />
      <h4>Exceptional Quality</h4>
    </div>
    <div className="value-item">
      <Factory size={40} strokeWidth={1} />
      <h4>Ethical Factories</h4>
    </div>
    <div className="value-item">
      <Search size={40} strokeWidth={1} />
      <h4>Radical Transparency</h4>
    </div>
  </section>
);
export default Values;
