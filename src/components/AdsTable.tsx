import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Advertise } from "../models";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { validatePositiveInteger, validateRequired } from "../assets/common";

const columns = [
  { field: "firstName", headerName: "Ads Name *", width: 500, sortable: false },
  { field: "lastName", headerName: "Quantity *", width: 500, sortable: false },
];

interface AdsTableProps {
  data: Advertise[];
  onChange: (value: Advertise[]) => void;
  dirty?: boolean;
}

const AdsTable = (props: AdsTableProps) => {
  const [checkList, setCheckList] = useState<number[]>([]);

  const onAdd = () => {
    props.onChange([...props.data, new Advertise()]);
  };

  const onCheckAll = (value: boolean) => {
    setCheckList(value ? props.data.map((_, idx) => idx) : []);
  };

  const onCheck = (idx: number) => {
    if (checkList.includes(idx)) {
      setCheckList(checkList.filter((i) => i !== idx));
    } else {
      setCheckList([...checkList, idx]);
    }
  };

  const onDeleteChecked = () => {
    props.onChange(props.data.filter((_, idx) => !checkList.includes(idx)));
    setCheckList([]);
  };

  const onDelete = (idx: number) => {
    props.onChange([...props.data.slice(0, idx), ...props.data.slice(idx + 1)]);
  };

  const onChangeField = <K extends keyof Advertise>(
    field: K,
    value: Advertise[K],
    idx: number
  ) => {
    props.onChange(
      props.data.map((item, index) =>
        index === idx ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={
                    props.data.length > 0 &&
                    checkList.length === props.data.length
                  }
                  onChange={(e) => onCheckAll(e.target.checked)}
                />
              </TableCell>
              {checkList.length === 0 ? (
                columns.map((col, idx) => (
                  <TableCell key={idx}>{col.headerName}</TableCell>
                ))
              ) : (
                <TableCell colSpan={columns.length}>
                  <Button
                    startIcon={<DeleteIcon color="error" />}
                    onClick={onDeleteChecked}
                  />
                </TableCell>
              )}
              <TableCell width={120}>
                <Button variant="outlined" size="small" onClick={onAdd}>
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={checkList.includes(idx)}
                    onChange={() => onCheck(idx)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.name}
                    size="small"
                    variant="standard"
                    fullWidth
                    error={props.dirty && !validateRequired(item.name)}
                    onChange={(e) => onChangeField("name", e.target.value, idx)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.quantity}
                    size="small"
                    variant="standard"
                    type="number"
                    fullWidth
                    error={
                      props.dirty &&
                      !validatePositiveInteger(String(item.quantity))
                    }
                    onChange={(e) =>
                      onChangeField("quantity", Number(e.target.value), idx)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<DeleteIcon color="error" />}
                    onClick={() => onDelete(idx)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AdsTable;
