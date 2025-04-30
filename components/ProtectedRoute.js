"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.studentAuth);
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else if (user.role && allowedRoles && !allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
    } else {
      setChecked(true);
    }
  }, [user]);

  return checked ? children : null;
}
